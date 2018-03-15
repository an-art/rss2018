function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

BinarySearchTree.prototype.insert = function (key, value) {
    	let curNode = this._root;

    	if (!curNode.key) {
	    	curNode.key = key;
	    	curNode.value = value;
	    } else { 
	    	while (curNode) {
		    	if (curNode.key > key) {
		   			if (!curNode.left) {
				    	curNode.left = new Node(key, value);
				    	break;
			    	} else {
			    		curNode = curNode.left;
			    	}
			    } else if (curNode.key < key) {
			     	if (!curNode.right) {
				    	curNode.right = new Node(key, value);
				    	break;
			    	} else {
			    		curNode = curNode.right;
			    	}
				} else break;
			}
		}
    	return this;
    };

BinarySearchTree.prototype.root = function () {
    	return this._root.value;
};

BinarySearchTree.prototype.delete = function (key) {
    	this._root = removeNode(this._root);

    	function removeNode(node) {
		    if(node === null) return null;
		    else if (key < node.key) {
		        node.left = removeNode(node.left, key);
		        return node;
		    } else if (key > node.key) {
		        node.right = removeNode(node.right, key);
		        return node;
		    } else {
		        if (!node.left && !node.right) {
		            node = null;
		            return node;
		        }
		        if (!node.left) {
		            node = node.right;
		            return node;
		        } else if (!node.right) {
		            node = node.left;
		            return node;
		        }
		        let temp = node.right;
		        while (temp.left) {
		        	temp = temp.left
		        }

		        node.key = temp.key;
		        node.value = temp.value;
		 
		        node.right = removeNode(node.right, temp.key);
		        return node;
	    }
	}
   	return this;
};

BinarySearchTree.prototype.search = function (key) {
    	let curNode = this._root;

    	if(curNode.key === key) {
    		return curNode.value;
    	} else {
    		while (curNode) {
    			if (curNode.key > key && curNode.left) {
		   			if (curNode.left.key === key) {
				    	return curNode.left.value;
			    	} else {
			    		curNode = curNode.left;
			    	}
			    } else if (curNode.key < key && curNode.right) {
			     	if (curNode.right.key === key) {
				    	return curNode.right.value;
			    	} else {
			    		curNode = curNode.right;
			    	}
				} else break;
    		}
    	}
};

BinarySearchTree.prototype.contains = function (value) {
	let values = this.traverse(true);
	
	return values.includes(value);
};

BinarySearchTree.prototype.traverse = function (order) {
	let curNode = this._root;
	let result = [];

	if (order) inTrueOrder(curNode);
	else inFalseOrder(curNode);

	function inTrueOrder (node) {
		if (node) {
			if (node.left) {
				inTrueOrder(node.left);
			}
			result.push(node.value);
			if (node.right) {
				inTrueOrder(node.right);
			}
		}
	}
	
	function inFalseOrder (node) {
		if (node) {
			if (node.right) {
				inFalseOrder(node.right);
			}
			result.push(node.value);
			if (node.left) {
				inFalseOrder(node.left);
			}
		}
	}

	return result;
};

BinarySearchTree.prototype.verify = function () {
	let curNode = this._root;

	if (!curNode) return true;
	if (curNode.left && curNode.left.key > curNode.key) return false;
	if (curNode.right && curNode.right.key < curNode.key) return false;	
	
	return true;
};




module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'STUDENT NAME'
};
