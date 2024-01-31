import { createSlice } from "@reduxjs/toolkit";

const boxRegisterSlice = createSlice({
    name: 'boxRegister',
    initialState: {
        boxRegister: {
            sports: [],
            fecilities: [],
            termsAll: [
                { id: 1, check: false, description: 'The Primary function of this facility is to serve the recreational, educational, wellness and sports needs of the users.' },
                { id: 2, check: false, description: 'Organized activities, events, tournaments, etc. in the field must have a reservation and confirmed payment.' },
                { id: 3, check: false, description: 'GOG Multi-sports turf do not assume liability for property loss, theft or any injuries resulting from any activity, event or coaching.' },
                { id: 4, check: false, description: 'Possession or Consumption of alcoholic beverages, public intoxication is prohibited in the facility.' },
                { id: 5, check: false, description: 'Smoking, chewing tobacco & chewing gum is prohibited.' },
                { id: 6, check: false, description: 'Individuals or organizations cannot conduct commercial operations at the venue without prior consent.' },
                { id: 7, check: false, description: 'Management reserves the right to inspect any bag for the prohibited items.' },
                { id: 8, check: false, description: 'This premise is monitored by security cameras for your safety.' },
                { id: 9, check: false, description: 'Boots with Metal studs are prohibited.' },
                { id: 11, check: false, description: 'The Management reserves the right to evict any individual for any offensive, violent, abusive, discriminatory behavior of any kind shown towards any of the staff as well as other customers.' },
                { id: 12, check: false, description: 'All customers are to leave the pitch/ground once their time slot has been completed.' },
                { id: 13, check: false, description: 'Not more than 14 players at a time on field/ground. More than 14 players on filed will be considered an event and event charges will be applicable.' },
                { id: 14, check: false, description: 'Outside food and Beverages not permissible.' },
                { id: 15, check: false, description: 'Right of admission reserved.' },
                { id: 16, check: false, description: 'Children under the age of 10 years must be accompanied by a guardian (16 years or over) at all times.' },
            ],
        },
    },
    reducers: {
        setBoxRegister: (state, action) => {
            // for add and change single value
            const { fieldName, text } = action.payload;
            state.boxRegister[fieldName] = text;
        },
        setArrays: (state, action) => {
            // add default arrays items selected
            const { fieldName, text } = action.payload;
            const index = state.boxRegister[fieldName].indexOf(text);
            if (index !== -1) {
                state.boxRegister[fieldName].splice(index, 1);
            } else {
                state.boxRegister[fieldName].push(text);
                console.log(state.boxRegister[fieldName], "=====after data");
            }
        },
        addOneRule: (state, action) => {
            // add new rule in array 
            state.boxRegister.termsAll.push({ id: Date.now(), description: action.payload, check: false });
        },
        AddListRule: (state, action) => {
            // add selected list of rules in array
            action.payload.forEach((newTodo) => {
                const existingTodo = state.boxRegister.termsAll.find((todo) => todo.description === newTodo);
                if (existingTodo) {
                    existingTodo.completed = true;
                } else {
                    state.boxRegister.termsAll.push({ id: Date.now(), description: newTodo, check: true });
                }
            });
        },
        ruleChecked: (state, action) => {
            // change check status
            const todo = state.boxRegister.termsAll.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.check = !todo.check;
            }
        },

    }
})

export const { setBoxRegister, setArrays, ruleChecked, addOneRule, AddListRule } = boxRegisterSlice.actions;

export default boxRegisterSlice.reducer;