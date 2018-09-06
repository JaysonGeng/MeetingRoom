//====================
// Dependencies
//====================
const roomService = fw.getService('room');
const userService = fw.getService('user');
const emailService = fw.getService('email');

//====================
// Methods
//====================
/**
 * Render page
 * @param {Object} request
 * @param {Object} h 
 */
function render(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        resolve(h.view('views/index', {
            title:'Home Page',
            rooms: await roomService.getTodayDashboard()
        }));
    });
    
}

function renderRegister(request,h)
{
    return new Promise(async function (resolve, reject) {
        resolve(h.view('views/register', { title: 'Register' }, {layout: 'login.layout'}));
    });
    
}

function registerAccount(request,h)
{
    return new Promise(async function (resolve, reject) {
        let stResponse = {success:false,message:''};
        const user = await userService.getUserbyEmail(request.payload.email);
        if(user.length > 0)
        {
            stResponse.message = "User already exist";
            resolve(stResponse);
            return;
        }


        const salt = fw.utils.getUUID();
        const hashPassword = fw.utils.getMD5(request.payload.password + salt);

        const Params = 
        {
            name: request.payload.name,
            password: hashPassword,
            salt: salt,
            email: request.payload.email, 
            roleid: 2
        }
    
        await userService.addUser(Params);
        stResponse.success = true;

        const mailParams = 
        {
            to: request.payload.email,
            subject: "Confirm your Account Meeting Booking System",
            body: "<h1>Test</h1>"
        }
        emailService.sendEmail(mailParams);
        resolve(stResponse);     
    });
}

module.exports = 
{
    render : render,
    renderRegister: renderRegister,
    registerAccount: registerAccount
}