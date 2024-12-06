import { useMutation } from '@tanstack/react-query'
function useHookMutation(fnCallback) {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}

export default useHookMutation;