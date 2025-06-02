import { Button } from "./Button"
import right from "../assets/right.svg"
import left from "../assets/left.svg"

type Props = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props){
    return(
        <div className="flex flex-1 justify-center items-center gap-2">
            <Button variant="iconSmall" onClick={onPrevious} disabled={current === 1}>
                <img src={left} alt="" />
            </Button>

            <span className="text-sm text-gray-200">{current}/{total}</span>

            <Button variant="iconSmall" onClick={onNext} disabled={current === total}>
                <img src={right} alt="" />
            </Button>
        </div>
    )
}