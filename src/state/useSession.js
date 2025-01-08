import { create } from 'zustand'
import {persist, createJSONStorage} from "zustand/middleware";


const useSession = create(
    persist( (set) => ({
            session: undefined,
            setSession: (session) => {
                set((s)=>( {...s, session:session}))
            }
        }),
        {
            name: "golffit-storage",
            storage: createJSONStorage(()=>sessionStorage),
        }
    ))

export default useSession