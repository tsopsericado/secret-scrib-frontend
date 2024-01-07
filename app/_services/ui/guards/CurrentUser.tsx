'use client'

/* ========================================== |
  this is a component gaurds the profile page.
  can be use any where else) and will fetch 
  the current each on each refresh or new 
  load of page.
=========================================== */

import { useEffect, useState } from "react";
import { IUser } from "../../utils";
import axios from "axios";
import { API_URL } from "@/app/_components/constant";
import { LoaderComponent } from "..";
import { useRouter } from "next/navigation";

export default function CurrentUserGuard(Component: React.JSXElementConstructor<any>) {
  return function Gaurd(props: any) {
    const [current_user, set_current_user] = useState<IUser | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
      const getUser = async () => {
        const token = localStorage.getItem('token') as string;

        if (!token?.trim()) return setLoading(false);

        const res = await axios.get<{ user: IUser }>(API_URL + '/auth/current-user', {
          headers: {
            Authorization: `bearer ${token}`,
          }
        });
        console.log({ current_user_res: res })
        const user = res.data.user;

        set_current_user(user);
        setLoading(false);
      }

      getUser();

    }, []);

    if (loading) return <LoaderComponent />;

    if (!current_user) {
      return router.push('/');
    }

    return <Component {...props} currentUser={current_user} />;
  }
}
