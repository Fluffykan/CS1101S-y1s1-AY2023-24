const treeA = list(1, 2, 3, 4);
const treeB = list(list(1, 2), list(3, 4));
const treeC = list(list(1, 2), null, 3, list(4, null));


function add_tree(tr) {
    if(is_null(tr)) {
        return 0;
    } else {
        if (!is_list(head(tr))) {
            return head(tr) + add_tree(tail(tr));
        } else {
            return add_tree(head(tr)) + add_tree(tail(tr));
        }
    }
}

function count_tree(tr) {
    if (is_null(tr)) {
        return 0;
    } else {
        if (!is_list(head(tr))) {
            return 1 + count_tree(tail(tr));
        } else {
            return count_tree(head(tr)) + count_tree(tail(tr));
        }
    }
}

function flatten_tree(tr) {
    if(is_null(tr)) {
        return null;
    } else {
        if (!is_list(head(tr))) {
            return pair(head(tr), flatten_tree(tail(tr)));
        } else {
            return append(flatten_tree(head(tr)), flatten_tree(tail(tr)));
        }
    }
}

function map_tree(tr, f) {
    return map(x => !is_list(x) 
                    ? f(x)
                    : map_tree(x, f), tr);
}
