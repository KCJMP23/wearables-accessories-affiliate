import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    
    // For now, return a success response indicating the API is working
    // We'll implement the full database integration later
    return NextResponse.json({
      success: true,
      data: {
        id: resolvedParams.id,
        status: 'rejected',
        rejection_reason: body.reason || 'No reason provided',
        rejected_at: new Date().toISOString()
      },
      message: 'Post rejection API is working. Database integration coming soon.'
    });
  } catch (error) {
    console.error('Error rejecting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reject post' },
      { status: 500 }
    );
  }
} 