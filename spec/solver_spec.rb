require_relative '../boggle_solver'
require_relative '../boggle_board'
require_relative '../trie'

describe "Boggle Solver" do
  let(:dict) {File.expand_path("..\\dictionaries\\dictionary-nursery.txt", File.dirname(__FILE__))}
  let(:board) {BoggleBoard.new.shake!}
  let(:solver) {BoggleSolver.new(board, dict)}
  let(:solutions) {solver.solutions}

  describe "Initialize" do
    it 'creates a solver object' do
      expect(solver).to be_a_kind_of(BoggleSolver)
    end
  end

  describe "get_solutions" do
    it 'returns an array of words all at least 3 characters' do
      expect(solutions).to be_a_kind_of(Array)
      expect(solutions.all? {|word| word.length >= 3}).to be true
    end
  end

  describe 'valid coord' do
    it 'checks if row or column are too big' do
      expect(board.valid_coord?(3,4)).to eq false
      expect(board.valid_coord?(4,3)).to eq false
      expect(board.valid_coord?(-1,3)).to eq false
      expect(board.valid_coord?(3,-1)).to eq false
    end
  end

  describe 'load dictionary' do
    it 'loads dictionary correctly' do
      bsolver = BoggleSolver.new(BoggleBoard.new, dict)
      bsolver.load_dictionary(dict)
      trie = bsolver.trie
      expect(trie).to be_a_kind_of Trie
    end
  end
end