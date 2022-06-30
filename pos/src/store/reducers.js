const increase = 'increase';
const decrease = 'decrease';
const deleteitem = 'delete';
const clear = 'clear';

//const active_invoice = 1;

const invoiceUpdateReducer = (state, action) => {
    let active_invoice = action.active_invoice;
    let tempArray;
    let ItemDetails;

    switch (active_invoice) {
        case 1:
            tempArray = Object.assign([], state.invoice1_details);
            console.log(tempArray);
            break;
        case 2:
            tempArray = Object.assign([], state.invoice2_details);
            break;
        case 3:
            tempArray = Object.assign([], state.invoice3_details);
            break;
    }

    let ItemIndex = tempArray.findIndex((item) => item.ItemNumber === action.ItemNumber);
    console.log(ItemIndex);
    //let tempArray = state;
    switch (action.type) {
        case increase:
            if(ItemIndex === -1) {
                ItemDetails = action.ItemDetails;
                ItemDetails.Qty = 1;
                ItemDetails = Object.assign({}, ItemDetails);
                console.log(ItemDetails);
                break;
            }
            else {
                tempArray[ItemIndex].Qty++;
                tempArray = Object.assign([], tempArray);
                break;
            }

        case decrease:
            if (tempArray[ItemIndex].Qty > 1) {
                tempArray[ItemIndex].Qty--;
                tempArray = Object.assign([], tempArray);
                break;
            }
            break;
        case deleteitem:
            tempArray.splice(ItemIndex, 1);
            tempArray = Object.assign([], tempArray);
            break;
        case clear:
            tempArray = Object.assign([], []);
            break;
        default:
            return state;
    }

    switch (active_invoice) {
        case 1:
            if(ItemIndex === -1) {
                return {...state, invoice1_details: [...state.invoice1_details, ItemDetails]}
            }
            else {
                return { ...state, invoice1_details: tempArray }
            }
         
        case 2:
            if(ItemIndex === -1) {
                return {...state, invoice2_details: [...state.invoice2_details, ItemDetails]}
            }
            else {
                return { ...state, invoice2_details: tempArray }
            }

        case 3:
            if(ItemIndex === -1) {
                return {...state, invoice3_details: [...state.invoice3_details, ItemDetails]}
            }
            else {
                return { ...state, invoice3_details: tempArray }
            }

    }
}

export default invoiceUpdateReducer;

