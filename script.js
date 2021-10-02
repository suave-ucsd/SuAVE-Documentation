
// Dynamically update number of fields for subquestions, when value is entered TODO REMOVE?
// const input_subquestion_code = document.getElementById('sub_q_prefix');

// Listen for changes in the field that contains information on how
// to format the subquestion prefix
// input_subquestion_code.addEventListener('input', updateSubquestionPrefix);

// get configuration information from html form with user-input
var formData = new FormData(document.querySelector('form'));

// Listen to any changes in our form to update our mappings creation
// (will update when moving out of input field)
var form = document.querySelector('form');

// Initialize variables that we'll be updating when the forum updates
var subquestion_prefix = "";
var num_subquestions = 0;

// Create a dictionary that will house any subquestion codes we explicity specify,
// as well as question options that we specify
var subquestion_codes_dict = {};
var subquestion_options_dict = {};

// Initialize variables for BasedOn and Mapper columns
var based_on_str = "";
var mapper_str = "";


var changed_element_id = ""
form.addEventListener('change', function(e) {
    // figure out which element triggered the event
    changed_element_id = e.target.id;

    console.log(`change element id: ${changed_element_id}`);

    formData = new FormData(document.querySelector('form'));

    if (changed_element_id == "num_sub_q") {
        num_subquestions = formData.get(changed_element_id);
    }

    // if we detect a change in our prefix, clear the subquestion code dictionary
    // and change the stored subquestion prefix string
    if (changed_element_id == "sub_q_prefix") {
        subquestion_prefix = formData.get('sub_q_prefix');
        subquestion_codes_dict = {};
    };
    
    if (e.target.className == "sq_code") {
        console.log("SUBQUSTION CODE CHANGED");
        // add value to custom codes dictionary to reference later.
        // our id is going to look like: sub_q_code_i with i being number of element >= 1
        subquestion_codes_dict[changed_element_id] = formData.get(changed_element_id);
    };

    if (e.target.className == "sq_option") {
        console.log("SUBQUSTION OPTION NAME CHANGED");
        // create a dictionary that holds all of the mappings for our subquestion option names
        subquestion_options_dict[changed_element_id] = formData.get(changed_element_id);
    };

    
    // TODO find better way that detects which subelements are for subquestions to delete
    // perhaps only delete the amount we decrease by
    // Correct the amount of input elements by clearing the previous elements and
    // inserting the correct amount. Make sure to do this after grabbing any updated values we have in the dictionary
    var parent = document.getElementById("subquestions_block");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };

    // Limesurvey default subquestions start with a subquestion code typically two letters
    // and are followed by a zero padded number

    // Create variables that can store each subquestion code and elements
    var code_num = "";
    var curr_subquestion_code = "";
    var curr_subquestion_option = "";

    // Create a string that will house our subquestions input fields
    var subquestion_inputs_html = "";

    // add inputs for the names of our response answers to our html form
    for(i = 1; i <= num_subquestions; i++) {
        code_num = String(i).padStart(2,'0');
        // if we have a custom value for this, select it for input value insertion
        if (`sub_q_code_${i}` in subquestion_codes_dict) {
            curr_subquestion_code = `${subquestion_codes_dict[`sub_q_code_${i}`]}`;
        }
        else {
            curr_subquestion_code = `${subquestion_prefix}${code_num}`;
        };
        // get the subquestion option name for the current subquestion
        curr_subquestion_option = subquestion_options_dict[`sub_q_${i}`];

        subquestion_inputs_html += `<label for="sub_q_code_${i}">Subquestion #${i} Code: </label>
            <input type="text" id="sub_q_code_${i}" name="sub_q_code_${i}" value="${curr_subquestion_code}" class="sq_code"><br>`
        // insert input for subquestion options
        subquestion_inputs_html += `<label for="sub_q_${i}">Subquestion #${i} Value: </label>
            <input type="text" id="sub_q_${i}" name="sub_q_${i}" value="${curr_subquestion_option}" class="sq_option"><br>`
        
    };
    
    document.getElementById("subquestions_block").innerHTML = subquestion_inputs_html;
});

var question_code = "";
var question_type = "";
const submit_button = document.getElementById('submit_button');
var recommended_expression_type = "";

// listen for when the user submits the form
submit_button.addEventListener("click", function () {
    // Reset Mapper String and BasedOn string
    mapper_str = "";
    based_on_str = "";
    // Refresh form data variable again
    formData = new FormData(document.querySelector('form'));

    // -- VALIDATE MAKE SURE ALL LIST VALUES ARE FILLED --
    for (i = 1; i <= num_subquestions; i++) {
        console.log(formData.get(`sub_q_${i}`));
        if (formData.get(`sub_q_${i}`) === "undefined") {
            alert(`Subquestion #${i} was not assigned a value.`)
            return
        }
    };

    console.log("SUBMIT BUTTON PRESSED");
    question_code = formData.get('ls_q_code');
    question_type = formData.get('question_type');

    // See what kind of question we're mapping for

    // ----- FOR THE MULTIPLE CHOICE TYPE QUESTION -----
    if (question_type == 'multiple_choice') {
        console.log("IS MULTIPLE CHOICE")
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
        console.log("IS LIST")
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
    console.log(recommended_expression_type);
    console.log(based_on_str);    
    console.log(mapper_str); 
    // Reset table results string
    var result_table_section = ""
    // Make an array of our results for easy organization
    var results_arr = [recommended_expression_type, based_on_str, mapper_str]
    
    // Remove previous results from table to make room for new ones
    var table_results_parent = document.getElementById("tabular_results");
    while (table_results_parent.firstChild) {
        table_results_parent.removeChild(table_results_parent.firstChild);
    };
    // Construct html that has 
    for (i = 0; i < 3; i++) {
        result_table_section += `<td>${results_arr[i]}</td>`
    }
    table_results_parent.innerHTML = result_table_section
});

