import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "~/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AlertDialogHeader, AlertDialogFooter } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteCard } from "~/app/utils/card/cardUtils"


export default function CardDeleteButton({id}:{id:string}) {

    async function deleteFlashCard(id: string) {
        await deleteCard(id)
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger className="flex justify-center items-center z-10" asChild>
                <Button variant={'destructive'} className="z-20">
                    <Cross1Icon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-red-600" >
                    <AlertDialogTitle className="text-center">Do you wish to delete this card?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteFlashCard(id)}>Delete Card</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
