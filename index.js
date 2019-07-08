const readlineSync  = require("readline-sync")
const fs = require('fs')
let contacts = []

function main(){
    contacts = JSON.parse(fs.readFileSync("./data.json"))
    menuoption()
}
function menuoption(){
    let menu = ["Them nguoi dung danh ba" , "Sua chua danh ba" , "Tim kiem"]
    const option = readlineSync.keyInSelect(menu,"Hay chon chuc nang ?")
    switch(option){
        case 0 : 
            inputContact()
            menuoption()
            break
        case 1 : 
            updatecontact()
            menuoption()
            return
        case 2 :
            findcontact()
            menuoption()
            return
        default : return
    }
    
}
function inputContact(){
    let name = readlineSync.question("Nhap ten nguoi dung : ")
    let phone = readlineSync.question("Nhap so dien thoai : ")
    if(name.trim() !== "" && phone.trim() !== ""){
        let newcontact = {name, phone : parseInt(phone)}
        contacts.push(newcontact)
        fs.writeFileSync("./data.json",JSON.stringify(contacts),{encoding : "utf8"})
    }else{
        console.log("================*====================")
        console.log("Ban hay nhap du thong tin")
    }
}
function updatecontact(){
    let mangcontact = contacts.map(contact => JSON.stringify(contact))
    let contact = readlineSync.keyInSelect(mangcontact,"Ban muon cap nhat ai")
    if(contact >= 0){
        reupdatecontact(JSON.parse(mangcontact[contact]), contact)
    }  
}

function reupdatecontact(contact , index){
    const name = readlineSync.question(`Ten nguoi dung hien tai la -  ${contact.name} : `, anser => anser.trim() == true ? anser : contact.name)
    const phone = readlineSync.question(`So dien thoai hien tai la - ${contact.phone} : ` , anser => anser.trim() == true ? anser : contact.phone)
    if(name.trim() !== "" && phone.trim() !== ""){
        let newcontact = {name, phone : parseInt(phone)}
        contacts[index] = newcontact
        fs.writeFileSync("./data.json",JSON.stringify(contacts),{encoding : "utf8"})
    }else{
        console.log("================*====================")
        console.log("Ban hay nhap du thong tin")
    }
}
function findcontact(){
    const filtername = readlineSync.question("Tim kiem theo ten , neu khong muon co the de trong : ");
    const filterphone = readlineSync.question("Tim kiem theo so dien thoai : ")
    const contactsfiltered = contacts.filter(contact => {
        if(filtername.trim().length > 0 && contact.name.trim().toLowerCase().match(filtername.trim().toLowerCase().split(" ").join("")) != null ){
            return true
        }
        if(filterphone.trim().length > 0 && contact.name.trim().toLowerCase().match(filterphone.trim().toLowerCase().split(" ").join("")) != null ){
            return true
        }
        return false
    })
    if(contactsfiltered.length > 0){
        for(let contact of contactsfiltered){
            console.log("================*====================")
            console.log(contact)
        }
    }else{
        console.log("Khong tim thay nguoi dung")
    }
}
main()