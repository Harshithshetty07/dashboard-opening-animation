
import HomeImag from '../public/images/home-button.png';
import TemperatureImg from '../public/images/line-chart.png';
import PressureImag from '../public/images/line-graph.png';
import EnergyImag from  '../public/images/gauge.png';


export const CIRCLE_DATA = [
    {
        icon: <Image src={HomeImag} alt="Home" width={50} height={24} />,
        tittle: "Home",
        path: "/temperature",
    },
    {
        icon: <Image src={TemperatureImg} alt="STFT" width={45} height={28} />,
        tittle: "STFT",
        path: "/frequency",
    },
    {
        icon: <Image src={PressureImag} alt="FFT" width={50} height={24} />,
        tittle: "FFT",
        path: "/temperature",
    },
    {
        icon: <Image src={EnergyImag} alt="Gauges" width={50} height={45} />,
        tittle: "Gauges",
        path: "/temperature",
    }
]