import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableData } from "./table/table-data"
import { TableRow } from "./table/table-row"

export function AttendeeList(){

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
                    {Array.from({length:8}).map((_, i)=>(
                        <TableRow key={i} >
                            <TableData><input type="checkbox" /></TableData>
                            <TableData>12303</TableData>
                            <TableData>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white">Diego Fernandes</span>
                                    <span>diego@rocket.com.bt</span>
                                </div>
                            </TableData>
                            <TableData>4 dias atras</TableData>
                            <TableData>3 dias atras</TableData>
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
                        <TableData colSpan={3}>Mostrando 10 de 229 itens</TableData>
                        <TableData className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página 1 de 23</span>
                                <div className="flex gap-1.5">
                                    <IconButton>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton>
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