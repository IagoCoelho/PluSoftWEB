import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import DataRow from "./DataRow";

async function getCadastroFeddback(){
  const url = "http://localhost:8080/api/feedbacks"
  const resp = await fetch(url, {next:{revalidate: 3600}})
  if(!resp.ok) throw new Error("Não pode carregar os dados")
  return resp.json()
}

export default async function Home() {
  const data = await getCadastroFeddback()

  return (
    <>
      <NavBar active={"cadastro_feedback"} />

      <main className="bg-slate-900 m-20 p-12 rounded-xl">
      <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Feedbacks</h2>
          <Button href="/cadastro_feedback/new" icon={<CreditCardIcon className="h-6 w-6" />}>
            cadastrar feedback
          </Button>
        </div>

        <div id="data" className="text-slate-300 m-1">
          {data.map(feedback => <DataRow feedback={feedback}/>)}
        </div>
      </main>
    </>

  )
}
