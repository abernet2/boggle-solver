require_relative 'trie'
require 'pry'
require_relative 'boggle_board'
require 'set'

class BoggleSolver
  attr_reader :board, :trie, :score

  def initialize(board, dictionary_file=nil)
    dictionary_file ||= File.expand_path('dictionaries/dictionary-common.txt', File.dirname(__FILE__))
    @board = board
    @trie = load_dictionary(dictionary_file)
    @solutions = Set.new
    @score = 0
  end

  def solutions
    if @solutions.empty?
      board.each_with_index do |row, rindex|
        row.each_index do |cindex|
          solve_cell(rindex, cindex, Set.new, board[rindex][cindex])
        end
      end
    end
    @solutions.to_a
  end

  def load_dictionary(file)
    trie = Trie.new
    trie.load_dict(file)
    trie
  end

  def solve_cell(row, col, visited, sequence="")
    return unless trie.sequence?(sequence)

    @solutions.add(sequence) if sequence.length > 2 && trie.contains?(sequence)  

    neighbors = board.get_neighbor_indices(row, col)
    neighbors.each do |neighbor|
      x, y = neighbor
      if board.valid_coord?(x, y) && !visited.include?(neighbor)
        next_seq = sequence + board[y][x]
        visited << neighbor
        solve_cell(y, x, visited, next_seq)
        visited.delete(neighbor)
      end
    end
    @solutions.to_a
  end

  def valid_neighbors(r, c, visited)
    neighbors = @board.get_neighbor_indices(r, c)
    neighbors.select do |neighbor|
      x, y = neighbor
      !visited.include?(neighbor) && board.valid_coord(x, y)
    end
  end

  def score_of(word)
    length = word.length - 3
    if length == 0 
      1
    elsif length < 4
      length
    elsif length == 4
      5
    else
      11
    end
  end
end