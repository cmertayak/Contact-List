/**
 * Created by cuneyt on 8/10/14.
 */
(function(doc){
    var nameArr = doc.getElementsByClassName('js-name'),
        name;

    if(nameArr.length > 0) {
        name = nameArr[0];
        name.focus();
    }
})(document);