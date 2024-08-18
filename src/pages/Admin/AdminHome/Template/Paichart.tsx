import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartState {
    series: number[];
}



const Paichart = React.memo(({ data }: { data: { [key: string]: number } }) => {
    const state: ChartState = {
        series: Object.values(data),
    };
    
    const options: ApexOptions = {
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'donut',
        },
        colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
        labels: Object.keys(data),
        legend: {
            show: false,
            position: 'bottom',
        },

        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        responsive: [
            {
                breakpoint: 2600,
                options: {
                    chart: {
                        width: 380,
                    },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    };

    return (
        <div className="sm:px-7.5 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Visa Analytics
                    </h5>
                </div>

            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {
                    Object.keys(data)?.map((item, indx) => {
                        return <div key={item + indx} className="sm:w-1/2 lg:w-1/3 px-8">
                            <div>
                                <div className="flex w-full items-center">
                                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                        <span> {item} </span>
                                        <span> {data[item]} </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
});

export default Paichart;
