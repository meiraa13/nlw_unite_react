import { ComponentProps } from "react";

interface ITableRow extends ComponentProps<"tr">{}

export function TableRow(props:ITableRow){

    return(
        <tr {...props} className="border-b border-white/10 hover:bg-white/5" />
    )
}