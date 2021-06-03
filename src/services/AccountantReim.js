import axios from 'axios'
const URL = 'http://localhost:8081/r1/accountReimburse';
const ADMINURL='http://localhost:8081/r1/totalExpense';

class AccountantReim
{
    getReimburse()
    {
         return axios.get(URL);
    }
    getAdminReimburse()
    {
         return axios.get(ADMINURL);
    }
}
export default new AccountantReim();