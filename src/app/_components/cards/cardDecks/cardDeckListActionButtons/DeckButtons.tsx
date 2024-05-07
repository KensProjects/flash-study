import DeleteDeckButton from "./DeleteDeckButton";
import EditDeckButton from "./EditDeckButton";

export default function DeckButtons({id}:{id:string}) {
    return (
        <div className="flex justify-center items-center gap-2 w-full h-12 relative lg:opacity-0 hover:opacity-100 duration-150 opacity-100" >
            <EditDeckButton deckId={id}/>
            <DeleteDeckButton id={id} />
        </div>
    )
}
