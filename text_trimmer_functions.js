/** 
    * Takes in one big string from an HTML text area called "process_me".
    * The string represents a log from a hypothetical roleplaying chatroom in which each post starts with a timestamp in [square brackets].
    * Furthermore, in-character posts have an asterisk * next to this timestamp, while out-of-character posts do not. 
    * This function trims away all timestamps and out-of-character chatter, leaving a clean log of character actions for more pleasant roleplay re-reads. 
    * The processed log is then placed in another text area called "output".
    */
function cleanLog() {
    // Initialize
    const input_string = document.getElementById("process_me").value; // String from text box
    let processed_string = ""; // Will be concatenated with new pieces throughout the process
    let current_index = 0;
    let end_index = 0;

    // Goal: When a * is present, keep everything from the last ] to the next [, exclusive. Remove all else.

    // Iteratively: (while current index is less than string length and no indices have gone out of bounds)
    while (current_index < input_string.length && current_index > -1 && end_index > -1) {
        // Find index where a ] occurs.
        current_index = input_string.indexOf("]", current_index); // Finds index of first occurrence of ], starting at current_index
        // Also find index where a [ occurs to determine where the block of valid text stops.
        end_index = input_string.indexOf("[", current_index);

        // Determine if there is a ' *' immediately after the ], as this indicates a valid chunk of text.
        if (input_string.slice(current_index, current_index + 3).includes(' *')) {
            // If so, grab everything between '] *' and '[', exclusive, and add to the final string with a newline.
            if (end_index > -1) {
                processed_string += input_string.slice(current_index + 3, end_index) + "\n";
            }
            // If end_index is -1, there is no post after this one, so grab everything that is left (before adding this statement, it cut off the last character under some conditions).
            else {
                processed_string += input_string.slice(current_index + 3) + "\n";
            }
        }
        // Move current_index forward for next loop
        current_index = end_index + 1;
    }
    // The processing is largely done!
    // If double spaces are left over, replace them with single spaces.
    processed_string = processed_string.replaceAll("  ", " ");

    // Done! Set the output area to equal this new string.
    document.getElementById("output").innerHTML = processed_string;
    document.getElementById("After-Instructions").innerHTML = "Enjoy reading! Copy-paste elsewhere to save these results.";

}

/**
 * Fills a text area called "process_me" with an example chat log for cleaning.
 */
function fillWithExample() {
    document.getElementById("process_me").innerHTML = `[2024-02-05 11:07] Jemaine: EXAMPLE: This is an out-of-character message. Please copy-paste your own chat log in place of this one when ready.
[2024-02-05 11:08] Dahlia: Now I'll have my character take an action.
[2024-02-05 11:09] *Dahlia  jumps and flips over the back of the couch, landing perfectly in her seat!
[2024-02-05 11:10] Dahlia: Cool, now you do something too!
[2024-02-05 11:11] *Jemaine  bows in reverence of his friend's skill.`;
}
