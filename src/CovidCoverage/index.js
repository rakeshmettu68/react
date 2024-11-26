import {Component} from "react"

import VaccinationCoverage from "../VaccinationCoverage"

import "./index.css"

const apiConstants ={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"IN_PROGERSS",
}
class CovidCoverage extends Component {
    state = {datesData:[],apiStatus:apiConstants.initial}


    componentDidMount(){
        this.fetchCovidData()
    }

    fetchCovidData = async()=>{
        const apiUrl ="https://apis.ccbp.in/covid-vaccination-data"
        const response = await fetch(apiUrl)
        if(response.ok){
            const data =await response.json()
            const updateData = data.last_7_days_vaccination.map(eachItem=>({
                vaccineDate:eachItem.vaccine_date,
                dose1:eachItem.dose_1,
                dose2:eachItem.dose_2,
            }))
            this.setState({datesData:updateData,apiStatus:apiConstants.success})
        }

        else{
            this.setState({apiStatus:apiConstants.failure})
        }



    }

    renderBarchart =()=>{

        const{datesData} = this.state
        return(
            <div className="chart-container">
                <h2 className="chart-heading"> Coverage</h2>
                <VaccinationCoverage datesData={datesData}/>
               
            </div>
        )
    }
    renderFailureView =()=>{
        <div className="chart-container">
            <img src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
            alt="api failure view"
            className="failure-img"/>
        </div>
    }

    renderChartsPages =()=>{
        const{apiStatus} = this.state
        switch(apiStatus){
            case apiConstants.success:
                return this.renderBarchart()
            case apiConstants.failure:
                return this.renderFailureView()
            default:
                return null;
        }
    }
    render(){
        return(
            <div className="app-container">
                <div className="responsive-container">
                    <div className="image-container">
                        <img src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                        alt="website logo"
                        className="plus-img"/>
                        <h1 className="co-win">co-WIN</h1>
                    </div>
                    <h1 className="heading">co-Win Vaccination in India</h1>
                    {this.renderChartsPages()}

                </div>
                
            </div>
        )
    }

    
}
export default CovidCoverage