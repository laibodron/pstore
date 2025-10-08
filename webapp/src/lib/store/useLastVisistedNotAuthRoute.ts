import { create } from 'zustand'

type LastVisitedNotAuthRouteState = {
  last: string
  change: (path: string) => void
}

const useLastVisitedNotAuthRouteState = create<LastVisitedNotAuthRouteState>((set) => ({
  last: '',
  change: (path: string) => set({ last: path }),
}))

export default useLastVisitedNotAuthRouteState
