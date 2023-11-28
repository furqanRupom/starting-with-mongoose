import express from "express"
import { studentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";


const router = express.Router();

const modulesRoutes = [
       {
        path:'/students',
        route:studentRoutes,
       },
       {
        path:'/users',
        route:userRoutes,
       }

]

modulesRoutes.forEach(({path,route}) => router.use(path,route))



export default router;