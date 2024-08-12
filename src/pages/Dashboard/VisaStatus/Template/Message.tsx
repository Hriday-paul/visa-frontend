

export default function Message({msg} : {msg : string}) {
    return (
        <div className="px-12 py-8 border-t border-slate-200 dark:border-slate-500">
            <p>{msg}</p>
        </div>
    )
}
