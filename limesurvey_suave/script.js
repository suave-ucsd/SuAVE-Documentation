// Retrieve the html form data so we can extract information from it
var formData = new FormData(document.querySelector('form'));

// Listen to any changes in our form to update our mappings creation
// (will update when clicking/moving out of input field)
var form = document.querySelector('form');

// Initialize variables that we'll be updating when the forum updates
var subquestion_prefix = "";
var num_subquestions = 0;

// Create a dictionary that will house any subquestion codes we explicity specify,
// as well as question options that we specify
// (question options being the names of the available response options for the question in LimeSurvey)
var subquestion_codes_dict = {};
var subquestion_options_dict = {};

// Initialize variables for BasedOn and Mapper columns
var based_on_str = "";
var mapper_str = "";

// Listen for changes in the html form.
var changed_element_id = ""
form.addEventListener('change', function(e) {
    // figure out which element triggered the event by id
    changed_element_id = e.target.id;

    // get up to date form fields
    formData = new FormData(document.querySelector('form'));

    // If we detect that the number of subquestions was changed, then we will
    // add more subquestion inputs
    if (changed_element_id == "num_sub_q") {
        num_subquestions = formData.get(changed_element_id);
    }

    // if we detect a change in our subquestion prefix, we will clear the subquestion
    // dictionary with the assumption that the user would prefer to have their subquestion
    // codes automatically created
    if (changed_element_id == "sub_q_prefix") {
        subquestion_prefix = formData.get('sub_q_prefix');
        subquestion_codes_dict = {};
    };
    
    // If we detect a change in any subquestion codes (list/ multiple choice response IDs assigned in LimeSurvey),
    // then we will update a dictionary so that the entries persist when changing the number of subquestions
    if (e.target.className == "sq_code") {
        // update the subquestion code in our dictionary
        subquestion_codes_dict[changed_element_id] = formData.get(changed_element_id);
    };
    
    // if we detect a change in any names of our subquestion options (the response choices that
    // the users read and select from in LimeSurvey), then we add those to our dictionary of response names
    if (e.target.className == "sq_option") {
        // create a dictionary that holds all of the mappings for our subquestion option names
        subquestion_options_dict[changed_element_id] = formData.get(changed_element_id);
    };

    // in order to update the amount of subquestion inputs, we remove all subquestion form fields
    // to add the correct amount back
    var parent = document.getElementById("subquestions_block");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };

    // Create variables that can store each subquestion code and elements
    var code_num = "";
    var curr_subquestion_code = "";
    var curr_subquestion_option = "";

    // Initialize a string that will contain the HTML that we want to insert into our webpage
    // which will contain all of the subquestion input boxes
    var subquestion_inputs_html = "";
    for(i = 1; i <= num_subquestions; i++) {
        // Limesurvey default subquestion codes start typically two letters
        // followed by an ascending zero padded number
        code_num = String(i).padStart(2,'0');
        
        // If we have a subquestion code that doesn't follow automatic limesurvey convention,
        // then grab it from the dictionary that we updated when the user edited the code in the form
        // otherwise use the generic limesurvey convention for subquestion code
        if (`sub_q_code_${i}` in subquestion_codes_dict) {
            curr_subquestion_code = `${subquestion_codes_dict[`sub_q_code_${i}`]}`;
        }
        else {
            curr_subquestion_code = `${subquestion_prefix}${code_num}`;
        };

        // get the subquestion option name for the current subquestion
        curr_subquestion_option = subquestion_options_dict[`sub_q_${i}`];
        
        // create two input tags. One for the subquestion code, the other for the readable text that will be mapped
        // to in our SuAVE responses.
        subquestion_inputs_html += `<label for="sub_q_code_${i}">Subquestion #${i} Code: </label>
            <input type="text" id="sub_q_code_${i}" name="sub_q_code_${i}" value="${curr_subquestion_code}" class="sq_code"><br>`
        subquestion_inputs_html += `<label for="sub_q_${i}">Subquestion #${i} Value: </label>
            <input type="text" id="sub_q_${i}" name="sub_q_${i}" value="${curr_subquestion_option}" class="sq_option"><br><br>`
    };
    
    // Fill in the section where all of our subquestion fields go
    document.getElementById("subquestions_block").innerHTML = subquestion_inputs_html;
});

// Initialize variables to house form inputs
var question_code = "";
var question_type = "";
const submit_button = document.getElementById('submit_button');
var recommended_expression_type = "";

// listen for when the user presses the submit button for the form
submit_button.addEventListener("click", function () {
    // Reset Mapper String and BasedOn string
    mapper_str = "";
    based_on_str = "";

    // Refresh form data variable again
    formData = new FormData(document.querySelector('form'));

    // -- VALIDATE MAKE SURE ALL LIST VALUES ARE FILLED --
    // If the user didn't specify a readable response for a subquestion, then alert and
    // prevent them from continuing until entering a response to map
    for (i = 1; i <= num_subquestions; i++) {
        console.log(formData.get(`sub_q_${i}`));
        if (formData.get(`sub_q_${i}`) === "undefined") {
            alert(`Subquestion #${i} was not assigned a value.`)
            return
        }
    };
    // Update variables with final form information
    question_code = formData.get('ls_q_code');
    question_type = formData.get('question_type');

    // ----- FOR THE MULTIPLE CHOICE TYPE QUESTION -----
    if (question_type == 'multiple_choice') {
        // ----- Construct BasedOn String -----
        for (i = 1; i <= num_subquestions; i++) {
            based_on_str += `${question_code}[${formData.get(`sub_q_code_${i}`)}]`
            // only add comma at the end
            if (i < num_subquestions) {
                based_on_str+=","
            }
        }

        // If the limesurvey has the other option enabled, add the other formatting
        // TODO maybe just keep other enabled all the time?
        if (formData.get('other_enabled') == 'on') {
            console.log('other is a yes')
            based_on_str+=`,${question_code}[other]`;
        };

        // ----- Construct Mapper String -----
        for (i = 1; i <= num_subquestions; i++) {
            mapper_str += `'${question_code}[${formData.get(`sub_q_code_${i}`)}]':`
            mapper_str += `'${formData.get(`sub_q_${i}`)}'`;
            // only add comma at the end
            if (i < num_subquestions) {
                mapper_str+=","
            }
        }

        // If the limesurvey has the other option enabled, add the other formatting
        // TODO maybe just keep other enabled all the time?
        if (formData.get('other_enabled') == 'on') {
            console.log('other is a yes')
            mapper_str+=`,'${question_code}[other]':'${question_code}[other]'`;
        };
    
        recommended_expression_type = "multi_from_dict";

    } else if (question_type === 'list_radio') {
        // ----- Construct BasedOn String -----
        based_on_str += `${question_code}`

        // ----- Construct Mapper String -----
        for (i = 1; i <= num_subquestions; i++) {
            mapper_str += `'${formData.get(`sub_q_code_${i}`)}':`
            mapper_str += `'${formData.get(`sub_q_${i}`)}'`;
            // only add comma at the end
            if (i < num_subquestions) {
                mapper_str+=","
            }
        }

        // If the limesurvey has the other option enabled, add the other formatting
        // TODO maybe just keep other enabled all the time?
        if (formData.get('other_enabled') == 'on') {
            console.log('other is a yes')
            mapper_str+=`,'-oth-':'${question_code}[other]'`;
        };
    
        recommended_expression_type = "dict";
    };

    mapper_str = `{${mapper_str}}`
    // Reset table results string
    var result_table_section = ""
    // Make an array of our results for easy organization
    var results_arr = [recommended_expression_type, based_on_str, mapper_str]
    
    // Remove previous results from table to make room for new ones
    var table_results_parent = document.getElementById("tabular_results");
    while (table_results_parent.firstChild) {
        table_results_parent.removeChild(table_results_parent.firstChild);
    };
    // Construct html table corresponding to the spreadsheet mappings tab 
    for (i = 0; i < 3; i++) {
        result_table_section += `<td>${results_arr[i]}</td>`
    }
    table_results_parent.innerHTML = result_table_section
});

