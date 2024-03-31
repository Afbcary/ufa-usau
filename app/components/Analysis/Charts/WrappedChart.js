import { useEffect } from "react";
import { Chart } from 'chart.js/auto';

export default function WrappedChart(props) {
    const id = props.title.trim().replaceAll(' ', '-');
    useEffect(() => {
        var ctx = document.getElementById(id).getContext('2d');
        var chart = new Chart(ctx, props.chartConfig);

        return () => {
            chart.destroy();
        }
    }, [props])

    return (
        <div>
            <h2>{props.title}</h2>
            <canvas id={id}></canvas>
        </div>
    )
}