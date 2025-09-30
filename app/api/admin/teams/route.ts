import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

// Verify admin authentication
async function verifyAdmin(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    // Add your admin email check here
    const adminEmails = [process.env.ADMIN_EMAIL || 'admin@example.com'];
    
    if (!adminEmails.includes(decodedToken.email || '')) {
      return null;
    }
    
    return decodedToken;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get('teamId');
    
    if (!teamId) {
      return NextResponse.json({ error: 'Team ID required' }, { status: 400 });
    }

    await dbAdmin.collection('teams').doc(teamId).delete();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teamId, action } = await req.json();
    
    if (!teamId || !action) {
      return NextResponse.json({ error: 'Team ID and action required' }, { status: 400 });
    }

    if (action === 'clearQuestions') {
      await dbAdmin.collection('teams').doc(teamId).update({
        questionsAttempted: []
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teamIds, action } = await req.json();
    
    if (!teamIds || !Array.isArray(teamIds) || !action) {
      return NextResponse.json({ error: 'Team IDs array and action required' }, { status: 400 });
    }

    const batch = dbAdmin.batch();
    
    if (action === 'bulkClearQuestions') {
      teamIds.forEach(teamId => {
        const teamRef = dbAdmin.collection('teams').doc(teamId);
        batch.update(teamRef, { questionsAttempted: [] });
      });
    }
    
    await batch.commit();
    
    return NextResponse.json({ success: true, count: teamIds.length });
  } catch (error) {
    console.error('Error bulk operation:', error);
    return NextResponse.json({ error: 'Failed to perform bulk operation' }, { status: 500 });
  }
}