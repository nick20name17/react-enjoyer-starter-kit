import { type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { routes } from '@/config/routes'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectIsAuth } from '@/store/slices/auth'

export const RequireAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    const isAuth = !useAppSelector(selectIsAuth)

    if (!isAuth) {
        return (
            <Navigate
                to={routes.login}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
