const treeA = list(1, 2, 3, 4);
const treeB = list(list(1, 2), list(3, 4));
const treeC = list(list(1, 2), null, 3, list(4, null));
const rand_lst = list(3,4,1,2);


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

function insertion_sort(lst) {
    function smallest(lst) {
        let s = Infinity;
        let l = lst;
        while(!is_null(l)) {
            head(l) < s ? s = head(l) : 0;
            l = tail(l);
        }
        return s;
    }
    
    if (is_null(lst)) {
        return null;
    } else {
        const s = smallest(lst);
        display(s);
        return pair(s, insertion_sort(remove(s, lst)));
    }
}


function merge_sort(lst) {
    if(is_null(lst) || is_null(tail(lst))) {
        return lst;
    } else {
        function take(lst, x) {
            if (x === 0) {
                return null;
            } else {
                return pair(head(lst), take(tail(lst), x - 1));
            }
        }
        
        function drop(lst, x) {
            if (x === 0) {
                return lst;
            } else {
                return drop(tail(lst), x - 1);
            }
        }
        
        function merge(a, b) {
            if (is_null(a)) {
                return b;
            } else if (is_null(b)) {
                return a;
            } else {
                return head(a) < head(b) 
                        ? pair(head(a), merge(tail(a), b))
                        : pair(head(b), merge(a, tail(b)));
            }
        }
        
        
        const mid = math_floor(length(lst) / 2);
        const wish1 = merge_sort(take(lst, mid));
        const wish2 = merge_sort(drop(lst, mid));
        return merge(wish1, wish2);
    }
}

        function take(lst, x) {
            if (x === 0) {
                return null;
            } else {
                return pair(head(lst), take(tail(lst), x - 1));
            }
        }
        
        function drop(lst, x) {
            if (x === 0) {
                return lst;
            } else {
                return drop(tail(lst), x - 1);
            }
        }
        
merge_sort(list(1,3,2,5,4));









