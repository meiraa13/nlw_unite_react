import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableData } from "./table/table-data"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export function AttendeeList(){
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)

    function handleInput(event: ChangeEvent<HTMLInputElement>){

    }

    function goToNextPage(){
        setPage(page + 1)
    }

    function goToPreviousPage(){
        setPage(page - 1)
    }

    function goToLastPage(){
        setPage(totalPages)
    }

    function goToFirstPage(){
        setPage(1)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <input className="px-3 py-1.5 w-72 border border-white/10 bg-transparent rounded-lg text-sm" placeholder="Buscar participante..." />
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
                    {attendees.slice((page -1) * 10, page * 10 ).map((attendee)=>(
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
                            <TableData>{dayjs().to(attendee.checkedInAt)}</TableData>
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
                        <TableData colSpan={3}>Mostrando 10 de {attendees.length} itens</TableData>
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