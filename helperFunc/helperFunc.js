
const replaceMonth = (date) => {
    const newdate = new Date(date);
    const months = [
        'ינואר', 'פברואר', 'מרץ', 'אפריל',
        'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר',
        'נובמבר', 'דצמבר'];
    const monthName = months[newdate.getMonth()];
    return monthName;
}


const permissions = (usersRole, prem) => {
    const roles = [
      { role: 'SEO_PROMOTER', premetion: ['READ', 'WRITE', 'UPDATE', 'CREATE'] },
      { role: 'ADMIN', premetion: ['READ', 'WRITE', 'UPDATE', 'CREATE'] },
      { role: 'SALES', premetion: ['READ'] }
      
    ];
  
    for (let userPermission of roles) {
        if (usersRole === userPermission.role && userPermission.premetion.includes(prem)){
            return true;
        }
    }
  };

module.exports = { replaceMonth }