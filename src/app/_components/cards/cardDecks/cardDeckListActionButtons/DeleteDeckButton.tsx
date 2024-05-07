'use client'

import { deleteDeck } from '~/app/utils/card/cardUtils'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'

export default function DeleteDeckButton({ id }: { id: string }) {

  async function deleteFlashCardDeck() {
    await deleteDeck(id)
  }

  return (
    <AlertDialog >
      <AlertDialogTrigger className="flex justify-center items-center" asChild>
        <Button variant={'destructive'}>
          <Cross1Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-red-600" >
          <AlertDialogTitle className="text-center">Do you wish to delete this deck?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteFlashCardDeck()}>Delete Deck</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )

}
