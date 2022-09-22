import './App.css';
import dataInfo from "./data/data"
import {useEffect, useState} from "react";
import moment from 'moment'

function App() {
  const [rewardsData, setRewardsData] = useState([]);
  const [monthsRewardsData, setMonthsRewardsData] = useState({});
  useEffect(() => {
    const data = dataInfo();
    data.sort((a,b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date)));
    const monthMap = {};
   
    data.forEach(el => {
      const currMonthName  = moment(el.date).format('MMMM');
      if(!monthMap[currMonthName]) {
        monthMap[currMonthName] = [];
        monthMap[currMonthName].push(el);
      } else {
        monthMap[currMonthName].push(el);
      }
      
    let reward = 0;
     if (el.amount_spent > 50 && el.amount_spent <= 100) {
      reward += (el.amount_spent - 50);
    } else if (el.amount_spent > 100) {
        reward += 50;
        reward += (el.amount_spent - 100) * 2;
    }
    el.reward_point = reward;
    })
    setMonthsRewardsData(monthMap);
    setRewardsData(data);
  }, []);
  
  return (
    <div>
<section>
    <div className="container">
  
        <div>
            <header>
                <h2 style={{textAlign: 'center'}}>Rewards Points</h2>
            </header>
            <div>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                            <th >
                                    <div >S.No</div>
                                </th>
                                 <th >
                                    <div >Date</div>
                                </th>
                                <th>
                                    <div >Item Name</div>
                                </th>
                                <th>
                                    <div >Amount Spent</div>
                                </th>
                                <th>
                                    <div >Rewards Point</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {rewardsData.length>0 && rewardsData.map((item, index) => {
                          return (
                             <tr>
                             <td >
                             <div >{index+1}</div>
                             </td>
                              <td >
                                 <div >{item.date}</div>
                             </td>
                             <td >
                                 <div >{item.item_name}</div>
                             </td>
                             <td >
                                 <div >${item.amount_spent}</div>
                             </td>
                             <td >
                                 <div >{item.reward_point}</div>
                             </td>
                         </tr>);
                          })}
                          {Object.keys(monthsRewardsData).map((item, index) => {
                            if(index<3) {
                               return (
                              <tr>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             <strong>
                                 <div className="pad-left">Total {item}
                                 <span className="green">{monthsRewardsData[item].reduce((partialSum, a) => partialSum + a.reward_point, 0)}</span></div></strong>
                             </td>
                         </tr>)
                            }
                         ;
                          })}
                          <tr>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             <strong>
                                 <div className="pad-left">Total 
                                 <span className="green">{rewardsData.reduce((partialSum, a) => partialSum + a.reward_point, 0)}</span></div></strong>
                             </td>
                         </tr>
                        </tbody>
                    </table>
                    {/* <div className="grid justify-items-end">
                      <div>Total</div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  );
}

export default App;
