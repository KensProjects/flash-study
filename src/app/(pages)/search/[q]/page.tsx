import CardDeckData from "~/app/_components/search/CardDeckData"
import UserData from "~/app/_components/search/UserData"
import { getSearchData } from "~/app/utils/search/searchUtils"

export default async function Search({ params }: { params: { q: string } }) {

  function fixParams(params: string) {
    if (params.includes('%')) {
      return params.replace('%20', " ")
    }
    return params
  }
  const query = fixParams(params.q)

  const [userData, cardDeckData] = await getSearchData(query)

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-full h-full m-8 text-left">

      <div id="user-data-container" className="flex flex-col justify-start items-center w-full h-full gap-4">
        <h2 className="text-3xl font-semibold border-b border-gray-200 w-full h-auto text-left py-4 pl-4">Users</h2>
        <UserData userData={userData!} />
      </div>

      <div id="cardDeck-data-container" className="flex flex-col justify-start items-center w-full h-full gap-4">
        <h2 className="text-3xl font-semibold border-b border-gray-200 w-full h-auto text-left py-4 pl-4">Card Decks</h2>
        <CardDeckData cardDeckData={cardDeckData!} />
      </div>

    </div>
  )
}
