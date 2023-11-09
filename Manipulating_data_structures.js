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

function insertion_sort_array(arr) {
    if (arr[0] === undefined) {
        return arr;
    } else {
        let ptr = 0;
        let trav = 1;
        let smallest = ptr;
        let temp = undefined;
        while (arr[ptr] !== undefined) {
            smallest = ptr;
            while (arr[trav] !== undefined) {
                arr[trav] < arr[smallest] ? smallest = trav : 0;
                trav = trav + 1;
            }
            temp = arr[smallest];
            arr[smallest] = arr[ptr]; 
            arr[ptr] = temp;
            ptr = ptr + 1;
            trav = ptr + 1;
        }
        return arr;
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

function merge(array, low, mid, high) {
    const result = [];
    let i = 0;
    let l = low;
    let m = mid;
    display(a);
    display(l);
    display(m);
    while (l < m && m < high) {
        if (array[low] < array[mid]) {
            display("if");
            result[i] = array[low];
            low = low + 1;
        } else {
            result[i] = array[mid];
            mid = mid + 1;
        }
    }
    return result;
}

const a = [1,3,2,4];
const mid = math_floor(array_length(a) / 2) + 1;
merge(a, 0, mid, 3);

// function _merge_sort_array(arr) {
//     if (arr[0] === undefined) {
//         return arr;
//     } else {
//         function merge(array, low, mid, high) {
//             const result = [];
//             let i = 0;
//             while (i <= high) {
//                 if (array[low] < array[mid]) {
//                     result[i] = array[low];
//                     low = low + 1;
//                 } else {
//                     result[i] = array[mid]
//                     mid = mid + 1;
//                 }
//             }
//             return result;
//         }
        
//         const mid = math_floor(array_length(arr) / 2);
//         return merge(arr, 0, )
//     }
// }


// function flatten_bst(bst) {
//     const div = "; ";
//     if(is_empty_tree(bst)) {
//         return null;
//     } else {
//         const right = right_branch(bst);
//         const left = left_branch(bst);
//         const value = head(bst);
//         if (is_tree(right) && is_tree(left)) {
//             const r = binary_search_tree_to_string(right);
//             const l = binary_search_tree_to_string(left);
//             return append(l, append(list(value), r));
//         } else if (is_tree(right) && !is_tree(left)) {
//             const r = binary_search_tree_to_string(right);
//             // display("right tree");
//             // display(value);
//             // display(r);
//             // display("end");
//             return append(list(value), r);
//         } else if (!is_tree(right) && is_tree(left)) {
//             const l = binary_search_tree_to_string(left);
//             // display("left tree");
//             // display(value);
//             // display(l);
//             // display("end");
//             return append(l, list(value));
//         } else {
//             display("error");
//             return 1;
//         }
//     }
// }


// function insert_to_bst(bst, item) {
//     // your answer here
//     if (is_null(bst)) {
//         return make_tree(item, null, null);
//     } else {
//         const right = right_branch(bst);
//         const left = left_branch(bst);
//         const value = entry(bst);
        
//         if (item > value) {
//             return make_tree(value, left, insert_to_bst_to_bst(right, item));
//         } else {
//             // item < head(bst)
//             return make_tree(value, insert_to_bst_to_bst(left, item), right);
//         }
//     }
    
// }






