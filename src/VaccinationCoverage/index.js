import {BarChart,XAxis,YAxis,Legend,Bar,ResponsiveContainer} from "recharts"

import './index.css'

const VaccinationCoverage =(props)=>{
    const{datesData} = props
    const DataFormatter = (value) => {
        if(value >1000){
            return `${(value/1000).toString()}k`
        }
        return value.toString()
    }
    return(
       <ResponsiveContainer width="90%" height={400}>
        <BarChart 
        data={datesData}
        margin={{top:5}}
        >
        <XAxis dataKey="vaccineDate" 
               tick={{
                stroke:"#5a8dee",
                strokeWidth:0,
                font_family:"Roboto",
                font_size:12,
                padding:20
               }}/>
        <YAxis tickFormatter ={DataFormatter}
                tick={{
                    stroke:"#5a8dee",
                strokeWidth:0.5,
                font_family:"Roboto",
                font_size:12,
                }

                }/>
        <Legend
        wrapperStyle={
            {
                iconType:"triangle",
                layout:"vertical",
                padding:10,

            }
        }
        />
         <Bar dataKey="dose1" name="Dose_1" fill="#1f77b4" barSize="20%" />
         <Bar dataKey="dose2" name="Dose_2" fill="#fd7f0e" barSize="20%" />
        </BarChart>
        </ResponsiveContainer>
        
    )
}

export default VaccinationCoverage