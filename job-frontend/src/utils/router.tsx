import {
    createBrowserRouter,
} from "react-router-dom";
import { JobList } from "../features/Job/JobsList/page/JobList";
import { JobDetails } from "../features/Job/JobDetails/page/JobDetails";
import { LoginForm } from "../features/Auth/Login/Login";
import { SignUpForm } from "../features/Auth/SignUp/SignUp";
import { Layout } from "../layout";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <h1 className="text-3xl font-bold text-red-400 underline">
                    Hello world!
                </h1>
            }, {
                path: '/jobs',
                element: <JobList />
            }, {
                path: '/job-details/:id',
                element: <JobDetails />
            },

        ]
    },
    {
        path: "/signup",
        element: <SignUpForm />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
]);