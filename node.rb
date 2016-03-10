class Node
  attr_reader :value, :word_end
  attr_accessor :left, :right, :middle
  include Comparable

  def initialize(value, word=false)
    @left = @right = @middle = nil
    @value = value
    @word_end = false
  end

  def <=>(other)
    return value.upcase <=> other.value.upcase if other.kind_of? Node
    return value.upcase <=> other.upcase if other.kind_of? String
  end

  def ==(other)
    return value.upcase == other.upcase if other.kind_of? String
    return value.upcase == other.value.upcase if other.kind_of? Node
  end

  def mark_end
    @word_end = true
  end

  def to_s
    value
  end
end