import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableData } from "./table/table-data"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"


dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface IAteendee {
    id:string
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null

}

export function AttendeeList(){
    const [search, setSearch] = useState(()=>{
        const url = new URL(window.location.toString())
        if(url.searchParams.has("search")){
            return url.searchParams.get("search") ?? ""
        }
        return ""
    })
    const [page, setPage] = useState(()=>{
        const url = new URL(window.location.toString())
        if(url.searchParams.has("page")){
            return Number(url.searchParams.get("page"))
        }
        return 1 
    })
    const [total, setTotal] = useState(0)
    const [attendees, setAttendees] = useState<IAteendee[]>([])
    
    const totalPages = Math.ceil(total / 10)

    useEffect(()=>{
        
        fetch(`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?pageIndex=${page - 1}&query=${search}`)
        .then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })

    }, [page, search])

    function setCurrentPage(pageParameter:number){
        const url = new URL(window.location.toString())
        url.searchParams.set("page", String(pageParameter) )
        window.history.pushState({}, "", url)
        setPage(pageParameter)
    }

    function setCurrentSearch(searchParameter:string){
        const url = new URL(window.location.toString())
        url.searchParams.set("search", searchParameter) 
        window.history.pushState({}, "", url)
        setSearch(searchParameter)
    }

    function handleInput(event: ChangeEvent<HTMLInputElement>){
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function goToNextPage(){
        setCurrentPage(page + 1)
    }

    function goToPreviousPage(){
        setCurrentPage(page - 1)
    }

    function goToLastPage(){
        setCurrentPage(totalPages)
    }

    function goToFirstPage(){
        setCurrentPage(1)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <input 
                 className="px-3 py-1.5 w-72 border border-white/10 bg-transparent rounded-lg text-sm" 
                 placeholder="Buscar participante..."
                 value={search}
                 onChange={handleInput} 
                />
            </div>

            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{width: 48}}><input type="checkbox" /></TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64}} ></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee)=>(
                        <TableRow key={attendee.id} >
                            <TableData><input type="checkbox" /></TableData>
                            <TableData>{attendee.id}</TableData>
                            <TableData>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white">{attendee.name}</span>
                                    <span>{attendee.email}</span>
                                </div>
                            </TableData>
                            <TableData>{dayjs().to(attendee.createdAt)}</TableData>
                            <TableData>{ attendee.checkedInAt === null
                                ? <span className="text-zinc-400">Não fez check-in</span>
                                : dayjs().to(attendee.checkedInAt)
                            }</TableData>
                            <TableData>
                                <IconButton transparent>
                                    <MoreHorizontal className="size-4" />
                                </IconButton>
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <TableData colSpan={3}>Mostrando {attendees.length} de {total} itens</TableData>
                        <TableData className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} >
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableData>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
                

}