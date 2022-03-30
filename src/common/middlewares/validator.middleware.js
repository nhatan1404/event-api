import { sanitize } from 'class-sanitizer';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export default function validatorMiddleware(
  type,
  skipMissingProperties = false,
) {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);

    validate(dtoObj, { skipMissingProperties }).then((errors) => {
      if (errors.length > 0) {
        const errorsMsg = errors.map((err) => ({
          field: err.property,
          message:
            'isEmpty' in err.constraints
              ? err.constraints.isEmpty
              : Object.values(err.constraints),
        }));
        res.send(errorsMsg).status(400);
      } else {
        sanitize(dtoObj);
        req.body = dtoObj;
        next();
      }
    });
  };
}
