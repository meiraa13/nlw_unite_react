export function AttendeeList(){

    return (
        <div>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <input className="px-3 py-1.5 w-72 border border-white/10 bg-transparent rounded-lg text-sm" placeholder="Buscar participante..." />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>Código</th>
                        <th>Participantes</th>
                        <th>Data de inscrição</th>
                        <th>Data do check-in</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>12303</td>
                        <td>
                            <div>
                                <span>Diego Fernandes</span>
                                <span>diego@rocket.com.bt</span>
                            </div>
                        </td>
                        <td>4 dias atras</td>
                        <td>3 dias atras</td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}