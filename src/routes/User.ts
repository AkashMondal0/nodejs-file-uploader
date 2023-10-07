import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    res.send('hello world user')
})


export default router