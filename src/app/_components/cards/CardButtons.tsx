import CardDeleteButton from "./CardDeleteButton";
import CardEditButton from "./CardEditButton";

export default function CardButtons({ id, question, answer }: { id: string, question: string, answer: string }) {
    return (
        <div className="flex justify-center items-center gap-4 h-fit w-full">
            <CardEditButton id={id} prevAnswer={answer} prevQuestion={question} />
            <CardDeleteButton id={id} />
        </div>
    )
}
