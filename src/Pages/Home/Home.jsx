import { StatisticProvider } from "../../Contexts/Statistic";
import Layout from "./Statistic";


export default function Home() {


    return (
        <StatisticProvider>
            <Layout/>
        </StatisticProvider>
    )
}