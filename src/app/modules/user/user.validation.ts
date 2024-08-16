import { z } from "zod";


  const userValidationSchema= z.object({
    id:z.string(),
    password:z.string().max(20, {message:'password can not be moe than 20 char'} ),
    needsPasswordChange:z.boolean().optional().default(true),
    role:z.enum(['student','faculty','admin']),
    status:z.enum(['in-progress', 'blocked' ]).default('in-progress'),
    isDeleted:z.boolean().optional().default(false)
  })

  export const UserValidation = {
      userValidationSchema,
     };