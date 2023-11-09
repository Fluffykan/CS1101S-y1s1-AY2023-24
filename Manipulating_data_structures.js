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


function merge_sort_array(A) {
    
    function merge_sort_helper(A, low, high) {
        if (low < high) {
            const mid = math_floor((low + high) / 2);
            merge_sort_helper(A, low, mid);
            merge_sort_helper(A, mid + 1, high);
            merge(A, low, mid, high);
        }
    }
    
    function merge(A, low, mid, high) {
        const B = [];
        let left = low;
        let right = mid + 1;
        let Bidx = 0;
        
        while (left <= mid && right <= high) {
            if (A[left] <= A[right]) {
                B[Bidx] = A[left];
                left = left + 1;
            } else {
                B[Bidx] = A[right];
                right = right + 1;
            }
            Bidx = Bidx + 1;
        }
        
        while (left <= mid) {
            B[Bidx] = A[left];
            Bidx = Bidx + 1;
            left = left + 1;
        }   
        while (right <= high) {
            B[Bidx] = A[right];
            Bidx = Bidx + 1;
            right = right + 1;
        }
        
        for (let k = 0; k < high - low + 1; k = k + 1) {
            A[low + k] = B[k];
        }
    }
        
    merge_sort_helper(A, 0, array_length(A) - 1);
}


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

function stream_refs(strm, n) {
    if (n === 0) {
        return head(strm);
    } else {
        return stream_refs(tail(strm)(), n - 1);
    }
}

function enum_streams(start, end) {
    return start > end
            ? "error, start > end"
            : start === end 
                ? pair(start, () => null)
                : pair(start, () => enum_streams(start + 1, end));
}

function stream_maps(strm, f) {
    return pair(f(head(strm)), () => stream_maps(tail(strm)(), f));
}

function stream_filters(strm, pred) {
    if (is_null(strm)) {
        return null;
    } else {
        return pred(head(strm)) 
                ? pair(head(strm), () => stream_filters(tail(strm)(), pred))
                : stream_filters(tail(strm)(), pred);
    }
}

function display_first_n_stream(strm, n) {
    let ptr = strm;
    while (n > 0) {
        display(head(strm));
        strm = tail(strm)();
        n = n - 1;
    }
}

const a = enum_streams(0, 4);

stream_filters(a, x => x % 2 === 0);



