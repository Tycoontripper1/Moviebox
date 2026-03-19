export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        const formatted = result.error.format()
        const flatErrors = Object.values(formatted).flatMap(err => err._errors).filter(Boolean)
        return res.status(400).json({ errors: flatErrors })
    }

    req.body = result.data  // use the cleaned/transformed data
    next()
}