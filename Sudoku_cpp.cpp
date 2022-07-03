class Solution
{
public:


    bool rightToPlace(vector<vector<char>> &board, int i, int j, char num, int n)
    {
        //This is work only for 9 x 9 Sudoku problem.
        for (int x = 0; x < n; x++)
        {
            // This is check for ith row and jth colum , If we found element already then simply return false
            if (board[i][x] == num || board[x][j] == num)
            {
                return false;
            }
        }
        // This is for 3 x 3 sudoku part
        int x = (i / 3) * 3;
        int y = (j / 3) * 3;
        for (int p = x; p < x + 3; p++)
        {
            for (int q = y; q < y + 3; q++)
            {
                // If we find element here then simply return false
                if (board[p][q] == num)
                {
                    return false;
                }
            }
        }

        return true;
    }

    bool sudokuSolver(vector<vector<char>> &board, int i, int j, int n)
    {
        //The first condition is i==n which occurs when we traverse the entier matrix.
        //So if we can traverse the entire matrix then we found our solution so return true to the parent.
        if (i == n)
        {
            return true;
        }
        // This condistion occurs when our currunt point is after last element in row.
        // in short if a[i][9] which is out bound for matrix then we need to go the next  row by i+1 and j=0
        // Here i am doing 0 base indexing so if you are in any other language then formula might not work.

        // Mistake : make sure you write "return sudokuSolver(board, i + 1, 0, n)" not just function call
        if (j == n)
        {
            return sudokuSolver(board, i + 1, 0, n);
        }
        // if element already had some value then there is no need to change it, So basically move on for next element.
        if (board[i][j] != '.')
        {
            return sudokuSolver(board, i, j + 1, n);
        }
        // This is heart part of problem
        // here we are checking for 1 to 9, if element is match then we go to next sub problem
        // else we backtrack to previos problem and change value or parent (col - 1) element while col is not zero
        // if col become zero then pointer go to previous row .This call backtracking.
        for (int z = 1; z <= 9; z++)
        {
            // rightToPlace fuction give true or false value according to element sutable for this place or not.
            if (rightToPlace(board, i, j, '0' + z, n) == true)
            {

                board[i][j] = '0' + z;
                // Here we call subproblem and check for response. If we got true it means subproblem will solve if we place element here.
                bool checkForNext = sudokuSolver(board, i, j + 1, n);
                if (checkForNext == true)
                {
                    return true;
                }
                // Mistake : If above case is not working then we need to change currunt point value to "."
                // this is second heart step of backtracking :)
                board[i][j] = '.';
            }
        }
        // If not match any element from 1 to 9 then we return false because in previos some where goes wrong!!
        return false;
    }

    // Main Sudoku Solver Fuction
    void solveSudoku(vector<vector<char>> &board)
    {
        // Here just pass value for sudokuSolver function...
        // board.size() must be 9
        bool x = sudokuSolver(board, 0, 0, board.size());
    }
};