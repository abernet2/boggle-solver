BOGGLE_DICE = %w(AAEEGN ELRTTY
 AOOTTW ABBJOO
 EHRTVW CIMOTU
 DISTTY EIOSST
 DELRVY ACHOPS
 HIMNQU EEINSU
 EEGHNW AFFKPS
 HLNNRZ DEILRX)


class BoggleBoard
  # attr_reader and board=nil are for debugging purposes
  attr_reader :board
  def initialize(board=nil)
    if board == nil
      @board = Array.new( 4, Array.new(4, '_') ) 
    else
      @board = board
    end
  end

  def shake!
    dice = BOGGLE_DICE.shuffle
    @board = Array.new(4) do |row|
        Array.new(4) do |col|
          die = dice.pop
          letter = die[rand(6)]
          letter == 'Q' ? letter = 'Qu' : letter + "" 
        end
    end
    self
  end

  # Defining to_s on an object controls how the object is
  # represented as a string, e.g., when you pass it to puts
  def to_s 
    ret = ""
    spacing = ""
    @board.each do |row|
      row.each { |cell| ret += "#{cell}" + spacing }
      ret += "\n"
    end
    ret
  end

  # defines each for enumerable methods, works for each cell
  def each
    @board.each do |row|
      yield(row)
    end
  end

  def each_with_index
    @board.each_with_index do |row, index|
      yield(row, index)
    end
  end

  # loop through array, checking for first character in given string
    # if you find it, check the neighbors for the next character in the string
    # if the final character is found return true
  def include?(word)
    @board.each_with_index do |row, y|
      row.each_with_index do |col, x|
        return true if part_of_word?(word.upcase, y, x, [])
      end
    end
    return false
  end

  # Main recursive Method
  # BASE CASES: 
  #   return false if this cell has been visited before
  #   return true if the current die is the last letter of word
  # INPUT:
  #   word(or remaining characters), row and col of current die,
  #   and an array of previously visited cells
  # OUTPUT:
  #   whether or not die is the next char in word
  # STEPS:
  #   Base cases: check if we've visited cell or if it is the final letter of word
  #   IF the next letter of word == letter of die
  #     add current cell to visited list
  #     get neighbors
  #     IF recursive call returns true then return true
  def part_of_word?(word, die_row, die_col, visited)
    die_letter = @board[die_row][die_col].upcase  # in case of qu
    return false if visited.include?([die_row, die_col])
    return true if word == die_letter     # will only return when last letter == die_letter

    if word[0] == die_letter[0]
      visited.push([die_row,die_col])
      neighbors = get_neighbor_indices(die_row, die_col)
      neighbors.each do |neighbor|
        col, row = neighbor
        return true if part_of_word?(word[die_letter.length.. -1], row, col, visited)
      end
      visited.pop
    end
    return false
  end

  def get_neighbor_indices(row, col)
    ret = []
    additives = [-1,0,1]
    additives.each do |row_add|
      additives.each do |col_add|
        x = col + col_add
        y = row + row_add
        coords = [x,y]
        ret.push( coords ) if valid_coord?(x, y) && coords != [row,col]
      end
    end
    ret
  end

  def valid_coord?(x, y)
    x_inbounds = x < @board[0].length && x >= 0
    y_inbounds = y < @board.length && y >= 0
    x_inbounds && y_inbounds
  end

  def [](index)
    board[index]
  end
end